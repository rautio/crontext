import Header from '@/components/Header';
import Editor from '@/components/Editor';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <Header />
      <Separator className="" />
      <main className="flex min-h-screen flex-col items-center justify-between pt-24 pr-4 pl-4 md:w-3/5 sm:w-11/12 m-auto">
        <Editor />
      </main>
    </>
  );
}
