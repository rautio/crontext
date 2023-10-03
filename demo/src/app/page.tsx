import Header from '@/components/Header';
import Editor from '@/components/Editor';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <Header />
      <Separator className="" />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Editor />
      </main>
    </>
  );
}
