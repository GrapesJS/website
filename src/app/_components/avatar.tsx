import cn from "classnames";

interface Props extends React.HTMLProps<HTMLDivElement> {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture, className }: Props) => {
  return (
    <div className={cn('flex items-center', className)}>
      {
        !!picture && <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      }
      <div className="font-semibold truncate">{name}</div>
    </div>
  );
};

export default Avatar;
