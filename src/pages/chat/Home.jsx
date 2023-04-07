import ChatsNavigator from './ChatsNavigator'
import ChatFrame from './ChatFrame'

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
      }}
    >
      <div style={{ marginLeft: '8px', marginTop: '8px' }}>
        <ChatsNavigator />
      </div>
      <div style={{ marginLeft: '8px', marginTop: '8px' }}>
        <ChatFrame />
      </div>
    </div>
  )
}

export default Home
