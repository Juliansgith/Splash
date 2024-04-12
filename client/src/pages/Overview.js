import StellingKaart from "../components/StellingBox"
//ook QuestionnaireList.js hierop toevoegen. Invoegen in app.js als / pagina

function QuestionnaireOverview() {
    return (
        <>
            <StellingKaart
            title="Mensen vanaf 65 jaar moeten gratis met trein, tram en bus kunnen reizen."
            tag="Gezondheid"
            company="Albert Heijn"
            imgcompany="assets/AHcompany.svg"
            />
        </>
    )
}

export default QuestionnaireOverview;