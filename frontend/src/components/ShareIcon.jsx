import {IoMdShare} from 'react-icons/io';

const ShareIcon = ({size = 21}) => {
  return (
    <div>
        <IoMdShare size={size} className=" text-white cursor-pointer"/>
    </div>
  );
};

export default ShareIcon;
