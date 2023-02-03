export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className='py-4 md:py-8'>{children}</section>;
}
