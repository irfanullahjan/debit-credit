export default async function Transaction({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const data = await fetch(`http://localhost:3001/transaction/${id}`);
  const transaction = await data.json();
  return (
    <div>
      <pre>{JSON.stringify(transaction, null, 2)}</pre>
    </div>
  );
}
