import { useState } from "react";
import StepDate from "./StepDate";
import StepSelectStores from "./StepSelectStores";
import StepSelectMedia from "./StepSelectMedia";
import StepFinishQuotation from "./StepFInishQuotation";

const Steps = () => {
  const [steps, setSteps] = useState(1);
  const nextStep = () => setSteps(s => s + 1);

  const [storeIds, setStoreIds] = useState<Array<number>>([]);
  const [mediaIds, setMediaIds] = useState<Array<number>>([]);

  return (
    <div>
      {steps >= 1 ? (
        <StepDate />
      ) : null}

      {steps >= 2 ? (
        <StepSelectStores storeIds={storeIds} setStoreIds={setStoreIds} />
      ) : null}

      {steps >= 3 ? (
        <StepSelectMedia mediaIds={mediaIds} setMediaIds={setMediaIds} />
      ) : null}

      {steps >= 4 ? (
        <StepFinishQuotation mediaIds={mediaIds} storeIds={storeIds} />
      ) : null}

      <div className="my-4">
      {steps < 4 ? (
    <button onClick={nextStep} className="font-bold text-sm flex items-center justify-center px-4 py-2 text-gray-900 bg-gray-200 rounded">Next</button>
      ) : (
    <button className="font-bold text-sm flex items-center justify-center px-4 py-2 text-gray-900 bg-gray-200 rounded">Finish quotation</button>

      )}
      </div>
    </div>
  )
};

export default Steps;