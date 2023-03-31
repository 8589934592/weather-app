import React, { useState } from "react";
import Left from "./components/Left";
import RightWeek from "./components/Right.week";
import RightHour from "./components/Right.hour";
import RightToday from "./components/Right.today";
import Search from "./components/Search";
import { Context } from "./components/Context";

function App() {
  const [search, setSearch] = useState("Paris");

  return (
    <>
      <Context.Provider
        value={{
          search,
          setSearch,
        }}
      >
        <div className="App">
          <div className="container" style={{ height: "90vh" }}>
            <div className="row">
              <div className="col-md-3 col-sm-12 bg-white p-4">
                <Search />
                <Left />
              </div>
              <div className="res col-md-9 col-sm-12 bg-light p-4">
                {/* <RightNotFound /> */}
                <div>
                  <input id="tab1" type="radio" name="tabs" defaultChecked />
                  <label htmlFor="tab1">Today</label>

                  <input id="tab2" type="radio" name="tabs" />
                  <label htmlFor="tab2">Week</label>

                  <input id="tab3" type="radio" name="tabs" />
                  <label htmlFor="tab3">Hour</label>

                  <section id="content1">
                    <RightToday />
                  </section>

                  <section id="content2">
                    <RightWeek />
                  </section>

                  <section id="content3">
                    <RightHour />
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Context.Provider>
    </>
  );
}

export default App;
