import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import ProductList from "../components/ProductList/ProductList";
import Modal from "../components/Modal/Modal";
import { useState } from "react";

const Home: React.FC = () => {
  const [refresh, setRefresh] = useState(true);
  const [SearchInput, setSearchInput] = useState("");

  const handleSearchChange = (event: CustomEvent) => {
    setSearchInput(event.detail.value);
    setRefresh((state) => !state);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="bg-orange-400">Produtique</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar onIonChange={handleSearchChange}></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Modal setRefresh={setRefresh}></Modal>
        <ProductList
          refresh={refresh}
          setRefresh={setRefresh}
          SearchInput={SearchInput}
        ></ProductList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
