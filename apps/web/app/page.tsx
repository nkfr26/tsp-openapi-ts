export default async function Page() {
  const data = await fetch("http://127.0.0.1:8787");
  const text = await data.text();
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{text}</h1>
      </div>
    </div>
  );
}
