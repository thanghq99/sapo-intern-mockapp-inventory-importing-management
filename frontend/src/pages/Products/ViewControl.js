import React, { useEffect } from "react";
import VariantDetails from "./VariantDetails";
import CreateVariant from "./CreateVariant";
import EditVariant from "./EditVariant";

function ViewControl(viewState, variantInfo) {
  useEffect(() => {}, [viewState, variantInfo]);
  if (viewState === 1) return <VariantDetails variantInfo={variantInfo} />;
  else if (viewState === 2) return <CreateVariant variantInfo={variantInfo} />;
  else if (viewState === 3) return <EditVariant variantInfo={variantInfo} />;
  else return <div>loading</div>;
}

export default ViewControl;
