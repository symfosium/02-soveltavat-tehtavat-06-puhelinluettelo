
const Notification = ({message}) => {
   const notificationStyle = {
      color: 'green',
      fontSize: '16px',
      border: '1px solid green',
      backgroundColor: '#d3d3d3',
      padding: '2px',
      marginBottom: '20px',
   }

   if (message === null) {
      return null;
   }

  return (
    <div style={notificationStyle}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification