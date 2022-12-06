import { SolutionPreview } from '../../components/solution-preview';
import { readFileSync  } from "fs";
import { resolve } from 'path';
import { useRouter } from 'next/router'

import Head from 'next/head';

export default function DayComponent({code, puzzle}: {code: string; puzzle: string}) {
  const router = useRouter();
  const day = router.query.day;

  return (
    <>
      <Head>
        <title>Unofficial AoC solutions {`${day}/25`}</title>
      </Head>
      <SolutionPreview code={code} puzzle={puzzle} />
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
    const code = readFileSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/index.ts`), {encoding:'utf8', flag:'r'});
    const puzzle = readFileSync(resolve(process.cwd(), `packages/2022/src/lib/day-${day}/puzzle.html`), {encoding:'utf8', flag:'r'});

    return {
      props: { code, puzzle },
    };
  } catch {
    return {
      notFound: true
    };
  }
}

