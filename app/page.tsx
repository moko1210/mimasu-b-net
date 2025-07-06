@"
export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">MIMASU B-net</h1>
      <p>製パン会社向け受発注プラットフォーム</p>
    </main>
  )
}
"@ | Out-File -FilePath "app/page.tsx" -Encoding UTF8
