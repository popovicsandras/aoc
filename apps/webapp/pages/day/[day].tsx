import Head from 'next/head';
import { readdirSync, readFileSync  } from "fs";
import { resolve } from 'path';
import { useRouter } from 'next/router'
import ContentOfTheDay from '../../components/content-of-the-day';
import { type CodeContainer } from '../../components/solution-preview';

export default function DayComponent({code, puzzle}: {code: CodeContainer; puzzle: string}) {
  const router = useRouter();
  const day = router.query.day as string;

  return (
    <>
      <Head>
        <title>{`Unofficial AoC solutions ${day}/25`}</title>
      </Head>
      <ContentOfTheDay key={day} code={code} puzzle={puzzle}/>
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
    const year = 2022;

    const fileNames = readdirSync(resolve(process.cwd(), `packages/${year}/src/lib/day-${day}`));
    const code = fileNames
      .filter(filename => /\.ts$/.test(filename))
      .reduce((acc, filename: string) => {
        return {
          ...acc,
          [filename]: readFileSync(resolve(process.cwd(), `packages/${year}/src/lib/day-${day}/${filename}`), {encoding:'utf8', flag:'r'})
        };
      }, {});

    const puzzle = readFileSync(resolve(process.cwd(), `packages/${year}/src/lib/day-${day}/puzzle.html`), {encoding:'utf8', flag:'r'});

    return {
      props: { code, puzzle },
    };
  } catch {
    return {
      notFound: true
    };
  }
}

