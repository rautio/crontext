import Header from '@/components/Header';
import Editor from '@/components/Editor';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Editor />
      </main>
    </>
  );
}
