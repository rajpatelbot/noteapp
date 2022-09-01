import './BodyImg.css'

const BodyImg = ({ bodyImg, style, cls }) => {
  return (
    <div className='noteapp__body-img'>
      <img src={bodyImg} alt='bodyImg' className={cls} />
    </div>
  )
}

export default BodyImg
