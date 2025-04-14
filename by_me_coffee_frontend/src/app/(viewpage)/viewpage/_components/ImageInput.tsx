import { CameraIcon } from "lucide-react"

const ImageInput = ({onClick}:{onClick:()=>void}) => {
    return(
        <label onClick={onClick} className="flex items-center cursor-pointer bg-[#18181B] px-4 py-2 rounded-lg gap-2 text-[#FAFAFA]">
            <CameraIcon />
            Add cover image
            <input type="file" className="hidden" />
          </label>
    )
}
export default ImageInput