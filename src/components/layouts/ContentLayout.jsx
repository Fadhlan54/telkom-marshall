export default function ContentLayout({ children, cClass = "" }) {
  return (
    <div>
      <div
        className={`shadow-xl border  rounded-xl ${cClass} p-4 md:px-12 md:py-6`}
      >
        {children}
      </div>
    </div>
  );
}
