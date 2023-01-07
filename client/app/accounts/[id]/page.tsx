export default async function Account({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params;
  const data = await fetch(`http://localhost:3001/account/${id}`);
  const account = await data.json();
  return (
    <div>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </div>
  );
}