import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { BluePill, GreenPill, RedPill, YellowPill } from "./forms/elements/Pills";
import { SELECTION_TEXT } from "../constants/selectionText";
import { HTML_MSG } from "../constants/htmlMsgs";

const Panel = () => {
  const { formData, action, fetchTime } = useContext(AppContext);

  const formatApi = (api) => {
    if (api === SELECTION_TEXT.NODE) {
      return HTML_MSG.API.NODE;
    } else if (api === SELECTION_TEXT.LARAVEL) {
      return HTML_MSG.API.LARAVEL;
    } else if (api === SELECTION_TEXT.NET) {
      return HTML_MSG.API.NET;
    }
  }

  const formBBDD = (bbdd) => {
    if (bbdd === SELECTION_TEXT.MYSQL ) {
      return "MySQL";
    } else if (bbdd === SELECTION_TEXT.POSTGRES) {
      return "PostgreSQL";
    } else if (bbdd === SELECTION_TEXT.SQLSERVER) {
      return "SqlServer";
    } else if (bbdd === SELECTION_TEXT.MONGODB) {
      return "Mongodb";
    }
  }
  
  return (
    <div className="flex items-center justify-between m-5">
      {formData.api && <RedPill text={formatApi(formData.api)} />}
      {formData.bbdd && <BluePill text={formBBDD(formData.bbdd)} />}
      {action && <GreenPill text={action} />}
      {fetchTime && <YellowPill text={fetchTime} />}     
    </div>
  );
}

export default Panel;