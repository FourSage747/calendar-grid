import "./App.scss";
import Header from "./components/Header";
import Calendar from "./components/Calendar";
import { useEffect } from "react";
import { publicHolidays } from "./redux/thunk";
import { useAppDispatch } from "./redux/store";
import { setCountry } from "./redux/reducer";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchCountryAndDispatch = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data: { country: string; country_name: string } =
          await response.json();

        const params = {
          year: new Date().getFullYear(),
          code: data.country,
        };

        dispatch(publicHolidays(params));
        dispatch(
          setCountry({
            country: data.country_name,
            year: new Date().getFullYear(),
          })
        );
      } catch (error) {
        console.error(error);

        dispatch(
          publicHolidays({
            year: new Date().getFullYear(),
            code: "US",
          })
        );
      }
    };

    fetchCountryAndDispatch();
  }, [dispatch]);
  return (
    <div className="App">
      <Header />
      <Calendar />
    </div>
  );
}

export default App;
