import Header from '@/components/Header';
import Editor from '@/components/Editor';
import Link from 'next/link';
import Explain from '@/icons/Explain';
import { Separator } from '@/components/ui/separator';
import ErrorBoundary from '@/components/ErrorBoundary';
export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Separator className="" />
      <main className="flex flex-col items-center justify-between pr-4 pl-4 max-w-6xl m-auto">
        <section className="md:m-16 m-6 text-center ">
          <h1 className="text-2xl">
            Generate a cron schedule from natural text.
          </h1>
          <p className="mt-2">
            <span className="text-lg text-orange-500">Warning: </span>This tool
            is currently under development.
          </p>
        </section>
        <ErrorBoundary>
          <Editor />
        </ErrorBoundary>

        <p className="text-sm text-neutral-400 text-center mt-4">
          For issues and feedback checkout the{' '}
          <Link
            href="https://github.com/rautio/crontext/issues"
            className="text-sky-500 hover:underline"
          >
            Github issues.
          </Link>
        </p>
        <div className="m-auto mt-8 md:mt-16">
          <Separator className="mb-4" />
          <h2 className="text-xl text-neutral-300 text-center mb-6">
            What is Cron?
          </h2>
          <Explain />
        </div>
      </main>
    </div>
  );
}
