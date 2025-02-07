import { Eye, EyeOff } from "lucide-react";

interface SpanEye {
  visible: boolean;
  handleVisible: () => void;
}

const SpanEye = ({ visible, handleVisible }: SpanEye) => {
  return (
    <span
      className="absolute top-12 block right-3 select-none cursor-pointer"
      onClick={handleVisible}
    >
      {visible ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
    </span>
  );
};

export default SpanEye;
