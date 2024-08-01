import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { triangle, ellipse, square, home, person } from "ionicons/icons";
import { Route, Redirect, useHistory } from "react-router";
import Tab1 from "../Tab1";
import Tab2 from "../Tab2";
import Tab3 from "../Tab3";
import LessonSvg from "../../components/svg/LessonSvg";
import HomeSvg from "../../components/svg/HomeSvg";
import ChallengeSvg from "../../components/svg/ChallengeSvg";
import CompteSvg from "../../components/svg/CompteSvg";
import Home from "../home/Home";
import { useAuth } from "../../hooks";
import { useEffect } from "react";
import { Matiere } from "../matiere";

const TabsPage: React.FC = () => {
  const {user, isAuth} = useAuth()
  const history = useHistory()
  useEffect(() => {
    if(!isAuth()){
      history?.push("/login")
    }
  },[user])
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <Matiere />
        </Route>
        <Route exact path="/tabs/lesson">
          <Tab2 />
        </Route>
        <Route path="/tabs/challenge">
          <Tab3 />
        </Route>
        <Route path="/tabs/compte">
          <Tab3 />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
            <HomeSvg />
          <IonLabel>Accueil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="lesson" href="/tabs/lesson">
          <LessonSvg />
          <IonLabel>Mes cours</IonLabel>
        </IonTabButton>
        <IonTabButton tab="challenge" href="/tabs/challenge">
          <ChallengeSvg />
          <IonLabel>Challenge</IonLabel>
        </IonTabButton>
        <IonTabButton tab="compte" href="/tabs/compte">
          <CompteSvg />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default TabsPage;
