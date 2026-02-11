export default function ReviewCard({
  name,
  rating,
  text,
}: {
  name: string;
  rating: string;
  text: string;
}) {
  return (
    <div className="rounded-md border p-4">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-slate-700">{rating}</p>
      </div>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}
