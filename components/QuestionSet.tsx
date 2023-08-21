
function QuestionSet({ question,selectedOptions,setSelectedOptions }: any,) {

  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{question.question}</h2>
        <div className="flex gap-5 flex-wrap">
          {question.options.map((option: any) => {
            return (
              <label key={option.option} htmlFor={option.option} className="flex gap-2 items-center">
                {option.option}{" "}
                <input
                  type="radio"
                  className="radio radio-primary"
                  name={question.question}
                  value={option.option}
                  onChange={() => {
                    setSelectedOptions([...selectedOptions,option.isCorrect])
                  }}
                />
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionSet;
