import {io} from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000")
  socket.on("connect", () => {
  console.log("Connected:", socket.id);
});
  return (
    <div>App</div>
  )
}

export default App