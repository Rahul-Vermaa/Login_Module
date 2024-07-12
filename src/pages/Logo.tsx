import image from "./images.jpeg"

function Logo() {
  return (
    <div>
          <img src={image.src} alt="Profile" className="rounded-circle" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
   </div>
  )
}

export default Logo