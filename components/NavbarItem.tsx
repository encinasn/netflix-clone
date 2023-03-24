interface NavbarItemProps {
  label: string;
}

export default function NavbarItem({ label }: NavbarItemProps) {
  return (
    <div className="cursor-pointer text-white transition hover:text-gray-300">
      {label}
    </div>
  );
}
