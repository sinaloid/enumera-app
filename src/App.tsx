import { Redirect, Route, useHistory } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonItem,
  IonList,
  IonPopover,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
//import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import LoadingPage from "./pages/loading/LoadingPage";
import TabsPage from "./pages/tabs/TabsPage";
import WelcomePage from "./pages/welcome/WelcomePage";
import LoginPage from "./pages/auth/LoginPage";
import { useAuth } from "./hooks";
import { useEffect } from "react";
import { Chapitre, Cours, Lecon, LeconDetail, Matiere } from "./pages";
import { Correction, Evaluation, EvaluationLecon } from "./pages/evaluation";
import CoursStatsDetail from "./pages/stats/CoursStatsDetail";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyOtpPage from "./pages/auth/VerifyOtpPage";
import Resultat from "./pages/evaluation/Resultat";
import StatsDetail from "./pages/profile/StatsDetail";
import { Message } from "./pages/notifications";
import Apropos from "./pages/apropos/Apropos";
import MessageList from "./pages/notifications/MessageList";
import { MonCompte } from "./pages/compte/MonCompte";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <LoadingPage />
          </Route>
          <Route exact path="/welcome">
            <WelcomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/verify-otp">
            <VerifyOtpPage />
          </Route>
          <Route exact path="/evaluation/:evaluationSlug/question">
            <Evaluation />
          </Route>
          <Route exact path="/resultat">
            <Resultat />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/chapitres"
          >
            <Chapitre />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/stats"
          >
            <StatsDetail />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/chapitres/:chapitreSlug/lecons"
          >
            <Lecon />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/chapitres/:chapitreSlug/lecons/:leconSlug"
          >
            <LeconDetail />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/chapitres/:chapitreSlug/lecons/:leconSlug/cours/:coursSlug"
          >
            <Cours />
          </Route>
          <Route
            exact
            path="/messages"
          >
            <MessageList />
          </Route>
          <Route
            exact
            path="/apropos"
          >
            <Apropos />
          </Route>
          <Route
            exact
            path="/correction"
          >
            <Correction />
          </Route>
          <Route
            exact
            path="/messages/:messageSlug"
          >
            <Message />
          </Route>
          <Route
            exact
            path="/mon-compte"
          >
            <MonCompte />
          </Route>
          <Route
            exact
            path="/classes/:classeSlug/periodes/:periodeSlug/matieres/:matiereSlug/chapitres/:chapitreSlug/lecons/:leconSlug/evaluation/:evaluationSlug"
          >
            <EvaluationLecon />
          </Route>
          <Route path="/tabs">
            <TabsPage />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
