type InputProps = {
  id: string;
  name: string;
  onChange: any;
  value: string;
  label: string;
  type?: string;
};

export default function Input({
  id,
  onChange,
  value,
  name,
  label,
  type = "text",
}: InputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="
      text-md
      peer
      block
      w-full
      appearance-none
      rounded-md
      bg-neutral-700
      px-6
      pt-6
      pb-1
      text-white
      focus:outline-none
      focus:ring-0
      "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
      text-md
      absolute
      top-4
      left-6
      z-10
      origin-[0]
      -translate-y-3
      scale-75
      transform
      text-zinc-400
      duration-150
      peer-placeholder-shown:translate-y-0
      peer-placeholder-shown:scale-100
      peer-focus:-translate-y-3
      peer-focus:scale-75
      "
      >
        {label}
      </label>
    </div>
  );
}
