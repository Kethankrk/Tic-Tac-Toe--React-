import { useState } from "react";

function App() {
  const [board, setBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);

  const [move, setMove] = useState(true);
  const [xMark, setXmark] = useState(0);
  const [oMark, setOmark] = useState(0);
  const [winner, setWinner] = useState(null);
  const [totalMove, setTotalMove] = useState(0);

  const AddItem = (i, j) => {
    if (board[i][j] != " ") {
      return;
    }
    const lol = [...board];
    lol[i][j] = move ? "X" : "O";
    setBoard(lol);
    if (CheckWin("X")) {
      setXmark((old) => old + 1);
      setWinner("x");
      return;
    }
    if (CheckWin("O")) {
      setOmark((old) => old + 1);
      setWinner("o");
      return;
    }
    setMove((old) => !old);
    setTotalMove((old) => old + 1);
    if (totalMove + 1 == 9) {
      alert("No more moves");
      return;
    }
    console.log(totalMove + 1);
  };

  const CheckWin = (player) => {
    for (let i = 0; i < 3; i++) {
      if (
        (board[0][i] == player &&
          board[1][i] == player &&
          board[2][i] == player) ||
        (board[i][0] == player &&
          board[i][1] == player &&
          board[i][2] == player)
      ) {
        return true;
      }
    }
    if (
      (board[0][0] == player &&
        board[1][1] == player &&
        board[2][2] == player) ||
      (board[0][2] == player && board[1][1] == player && board[2][0] == player)
    ) {
      return true;
    }

    return false;
  };

  const NewGame = () => {
    setBoard([
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ]);
    setWinner(null);
    setTotalMove(0);
  };
  const ResetGame = () => {
    NewGame();
    setOmark(0);
    setXmark(0);
  };

  return (
    <>
      <div className="flex justify-center bg-black pt-2 gap-5">
        <button
          className="w-[100px] py-2 text-green-600 font-bold rounded-md text-sm bg-gray-600"
          onClick={NewGame}
        >
          New Game
        </button>
        <button
          className="w-[100px] py-2 text-red-500 font-bold rounded-md text-sm bg-gray-600"
          onClick={ResetGame}
        >
          Reset Game
        </button>
      </div>
      <main className="bg-black min-h-screen flex justify-center px-10 flex-wrap-reverse items-end">
        {winner && (
          <div className="modal absolute bg-black bg-opacity-80 w-full h-screen flex justify-center items-center">
            <div className="p-5 rounded-xl bg-gray-700 w-2/3 max-w-[350px]">
              <p className="text-4xl text-center text-orange-400 font-bold mb-10">
                Win
              </p>
              <p className="text-green-500 text-center mb-4">
                🎉 Player {winner} win the game 🎉
              </p>
              <button
                className="w-full py-4 text-orange-500 font-bold rounded-md bg-green-800"
                onClick={NewGame}
              >
                New Game
              </button>
            </div>
          </div>
        )}
        <div className="flex-1 p-4 md:p-16 min-w-[500px]">
          <h1 className="text-white text-3xl font-bold text-center underline">
            PLAYERS
          </h1>
          <div className="flex justify-between mt-10">
            <div>
              <h2
                className={`${
                  move ? "text-green-500 current" : "text-white"
                } font-medium`}
              >
                PLAYER X
              </h2>
              <h4 className="text-white text-center mt-4">{xMark}</h4>
            </div>
            <div>
              <h2
                className={`${
                  move ? "text-white" : "text-green-500 current"
                } font-medium`}
              >
                PLAYER O
              </h2>
              <h4 className="text-white text-center mt-4">{oMark}</h4>
            </div>
          </div>
        </div>
        <div className="board rounded-lg bg-amber-900 p-2 h-fit mt-10">
          <h1 className="text-2xl font-semibold text-gray-400">Tic Tac Toe</h1>
          <div className="bg-black">
            <table className="text-white">
              {board.map((row, i) => (
                <tr className="">
                  {row.map((item, j) => (
                    <td
                      className="border w-[80px] h-[80px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] text-3xl sm:text-5xl md:text-6xl lg:text-9xl font-bold text-center"
                      onClick={() => AddItem(i, j)}
                    >
                      {item}
                    </td>
                  ))}
                </tr>
              ))}
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
