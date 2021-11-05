import { useState } from "react";
import { Box } from "../../styles/styles";

//The number in the file names tell you which step in the form they are
import JobBasics from "../../components/post-job/1_JobBasics";
import JobDetails from "../../components/post-job/2_JobDetails";
import JobSummary from "../../components/post-job/3_JobSummary";

export default function CreateProject() {
  const [formData, setFormData] = useState({
    jobtitle: "",
    jobdescription: "",
    jobtype: "",
    jobposition: "",
    jobcompensation: "",
    jobequity: "",
    joblocation: ""
  });

  const [timeframeActive, setTimeframeActive] = useState(false);

  const [locationActive, setLocationActive] = useState(false);

  const addLocation = () => {
  setLocationActive(true);
  }

  //Page States will change depending on whether the user clicks on Continue or Back
  const [basicsPage, setBasicsPage] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);

  //Change Page on Click
  const goToBasics = () => {
    setBasicsPage(true);
    setDetailsPage(false);
    setSummaryPage(false);
  };

  const goToDetails = () => {
    setDetailsPage(true);
    setBasicsPage(false);
    setSummaryPage(false);
  };

  const goToSummary = () => {
    setSummaryPage(true);
    setDetailsPage(false);
  };

  //Go Back
  const goBack = () => {
     history.goBack();
  };

  const addTimeframe = () => {
    setTimeframeActive(true);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const updateGigCategory = (e) => {
    setFormData({ ...formData, gigcategory: e });
  };

  const deleteCategory = (e) => {
    if (formData.gigcategory) {
      setFormData((prevCat) => {
        const updatedCategory = prevCat.gigcategory.filter(
          (category) => category !== e
        );
        return updatedCategory;
      });
    }
  };

  const createJob = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  return (
      <Box>
        <form>
          {basicsPage ? (
            <JobBasics
              goToDetails={goToDetails}
              goBack={goBack}
              formData={formData}
              onChange={onChange}
            />
          ) : null}

          {detailsPage ? (
            <JobDetails
              goToBasics={goToBasics}
              goToSummary={goToSummary}
              formData={formData}
              setFormData={setFormData}
              updateGigCategory={updateGigCategory}
              deleteCategory={deleteCategory}
              timeframeActive={timeframeActive}
              addTimeframe={addTimeframe}
              locationActive={locationActive}
              addLocation={addLocation}
              onChange={onChange}
            />
          ) : null}

          {summaryPage ? (
            <JobSummary
              formData={formData}
              goToDetails={goToDetails}
              goToBasics={goToBasics}
              createJob={createJob}
            />
          ) : null}
        </form>
      </Box>
  );
}
