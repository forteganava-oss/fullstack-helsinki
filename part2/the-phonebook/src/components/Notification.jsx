const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.tag}>
      {notification.text}
    </div>
  )
}

export default Notification
