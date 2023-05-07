import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Calender from "../widgets/Calender";
import { showSuccessToast, showErrorToast } from "../widgets/Toast";

const UpdateGraphForm = ({ initialValues }) => {
  const router = useRouter();
  const [id, setId] = useState(initialValues._id || "");
  const [selectedDay, setSelectedDay] = useState(initialValues._day || "");
  const [stateDay, setStateDay] = useState(initialValues.stateDay || "");
  const [namesSaints, setNamesSaints] = useState(
    initialValues.namesSaints || ""
  );
  const [labels, setLabels] = useState(
    initialValues.labels || [{ get_time: "", description: "" }]
  );

  const list = {
    _day: selectedDay,
    stateDay: stateDay,
    namesSaints: namesSaints,
    labels: labels,
  };

  const handleDaySelect = (date) => {
    setSelectedDay(date.format("DD.MM.YYYY"));
  };

  const handleAddLabel = () => {
    setLabels([...labels, { get_time: "", description: "" }]);
  };

  const handleLabelChange = (index, key, value) => {
    const updatedLabels = [...labels];
    updatedLabels[index][key] = value;
    setLabels(updatedLabels);
  };

  const handleDeleteLabel = (index) => {
    if (labels.length === 1) {
      return;
    }
    const updatedLabels = [...labels];
    updatedLabels.splice(index, 1);
    setLabels(updatedLabels);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/list/update", {
      method: "PUT",
      body: JSON.stringify({ id, body: list }),
    });
    if (response.ok) {
      router.push("/schedule");
      showSuccessToast("Успіх: збережено !");
    } else {
      showErrorToast("Помилка: не вдалося зберегти.");
    }
  };

  return (
    <div>
      <div className="items-center justify-center text-center w-full grid place-items-center mt-4">
        <Calender onDaySelect={handleDaySelect} />
        <div
          className={`${
            selectedDay && "rounded-md bg-hadfieldBlue text-white"
          } px-2 h-8 mt-4`}
        >
          <div className="mt-1">
            {selectedDay && <p>Вибраний день: {selectedDay} рік.</p>}
          </div>
        </div>
      </div>
      <form className="mx-auto max-w-xl" onSubmit={handleSubmit}>
        <input
          type="text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-sm md:text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5"
          placeholder="Важливість дня (необов'язково):"
          value={stateDay}
          onChange={(e) => setStateDay(e.target.value)}
        />
        <input
          type="text"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-sm md:text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-5"
          placeholder="Імена святих"
          value={namesSaints}
          onChange={(e) => setNamesSaints(e.target.value)}
        />
        <div>
          <div className="self-start">
            <button
              type="button"
              onClick={handleAddLabel}
              className="text-white mt-5 shadow-sm text-sm md:text-base bg-hadfieldBlue hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue px-3 py-2 rounded-md"
            >
              Додати допис
            </button>
          </div>

          {labels.map((label, index) => (
            <div
              key={index}
              className="flex items-center flex-wrap justify-between mt-5"
            >
              <input
                type="text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-sm md:text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-16 p-2.5"
                placeholder="годи"
                value={label.get_time}
                onChange={(e) =>
                  handleLabelChange(index, "get_time", e.target.value)
                }
              />
              <p>-</p>
              <input
                type="text"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-sm md:text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-8/12 p-2.5"
                placeholder="Опис події"
                value={label.description}
                onChange={(e) =>
                  handleLabelChange(index, "description", e.target.value)
                }
              />
              {labels.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteLabel(index)}
                  className="sm:mt-5 sm:w-full text-white shadow-sm text-sm md:text-base bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 px-3 py-2 rounded-md md:font-bold"
                >
                  Видалити
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="text-white shadow-sm text-sm md:text-base bg-hadfieldBlue hover:bg-hadfieldBlueLite focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hadfieldBlue px-3 py-2 rounded-md md:font-bold"
          >
            Зберегти
          </button>

          <Link
            href="/schedule"
            className="block text-white shadow-sm text-sm md:text-base bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 px-3 py-2 rounded-md md:font-bold"
          >
            Назат
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateGraphForm;
