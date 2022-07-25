import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [input, setInput] = useState();
    const [selectCoin, setSelectCoin] = useState();
    const [inverter, setInverter] = useState(false);

    const onChange = (e) => {
        setInput(e.target.value);
    };

    // const onClick = (e) => {};

    const selectedCoin = (e) => {
        setSelectCoin(e.target.value.split(" ").at(-2));
        console.log(e);
    };
    const inverted = (e) => {
        setInverter((current) => !current);
        setInput(inverter ? input * selectCoin : input / selectCoin);
        console.log(input);
        console.log(selectCoin);
    };
    const reset = () => {
        setInput(0);
    };

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((datas) => {
                setCoins(datas);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>The Coins!</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <select onChange={selectedCoin}>
                    <option>Select Coin to exchange!</option>
                    {coins.map((coin) => (
                        <option>
                            {coin.name}({coin.symbol}) :{" "}
                            {coin.quotes.USD.price.toFixed(2)} $
                        </option>
                    ))}
                </select>
            )}

            <div>
                <label for="money">Money</label>
                <input
                    value={inverter ? input * selectCoin : input}
                    id="money"
                    placeholder="dollar"
                    type="number"
                    onChange={onChange}
                    disabled={inverter}
                />
            </div>
            <div>
                <label htmlFor="bitcoin">Coin</label>
                <input
                    value={inverter ? input : input / selectCoin}
                    id="bitcoin"
                    placeholder="bitcoin"
                    type="number"
                    disabled={!inverter}
                    onChange={onChange}
                />
            </div>
            <button onClick={inverted}>
                {!inverter ? "money → bitcoin" : "money → bitcoin"}
            </button>
            <button onClick={reset}>reset</button>
        </div>
    );
}

export default App;
