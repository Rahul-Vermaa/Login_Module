import image from "../male-face-avatar-on-white-260nw-562359640.webp"

function Profileimage() {
  return (
    <div>
          <img src={image.src} alt="Profile" className="rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
   </div>
  )
}

export default Profileimage;