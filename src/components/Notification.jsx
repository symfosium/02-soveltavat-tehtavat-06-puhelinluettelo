
const Notification = ({message, type}) => {
   const notificationSuccessStyle = {
      color: 'green',
      fontSize: '16px',
      border: '1px solid green',
      backgroundColor: '#d3d3d3',
      padding: '2px',
      marginBottom: '20px',
   }

   const notificationErrorStyle = {
      color: 'red',
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
    <div style={type === 'success' ? notificationSuccessStyle : notificationErrorStyle}>
      <h2>{message}</h2>
    </div>
  )
}

export default Notification