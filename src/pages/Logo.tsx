import image from "./images.jpeg"

function Logo() {
  return (
    <div>
          <img src={image.src} alt="Profile" className="" style={{ width: '90px', height: '90px', objectFit: 'cover' , marginBottom:'10px'}} />
   </div>
  )
}

export default Logo