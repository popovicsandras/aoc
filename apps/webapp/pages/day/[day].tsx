import Head from 'next/head';
import { existsSync, readFileSync  } from "fs";
import { resolve } from 'path';
import { useRouter } from 'next/router'
import ContentOfTheDay from '../../components/content-of-the-day';

export default function DayComponent({main, code, puzzle}: {main: string; code: string; puzzle: string}) {
  const router = useRouter();
  const day = router.query.day as string;

  return (
    <>
      <Head>
        <title>Unofficial AoC solutions {`${day}/25`}</title>
      </Head>
      <ContentOfTheDay key={day} main={main} code={code} puzzle={puzzle}/>
    </>
  );
}

export async function getStaticPaths() {
  const paths = [...Array(25)].map((_value, day) => ({ params: { day: `${day + 1}` } }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  try {
    const day = context.params.day;
    const main = readFileSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/index.ts`), {encoding:'utf8', flag:'r'});
    let code = null;
    if (existsSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/process.ts`))) {
      code = readFileSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/process.ts`), {encoding:'utf8', flag:'r'});
    }
    const puzzle = readFileSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/puzzle.html`), {encoding:'utf8', flag:'r'});

    return {
      props: { main, code, puzzle },
    };
  } catch {
    return {
      notFound: true
    };
  }
}

