import React, { useState, useRef, useEffect } from "react";
import {
  IonButtons,
  IonButton,
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  useIonRouter,
  IonBadge,
} from "@ionic/react";
import { checkmarkDone } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core/components";
import { AddProduct } from "../../api/products";
import "./Modal.css";

interface ModalProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}
function Modal({ setRefresh }: ModalProps) {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputName = useRef<HTMLIonInputElement>(null);
  const inputPrice = useRef<HTMLIonInputElement>(null);
  const inputQuantity = useRef<HTMLIonInputElement>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [BadgeText, setBadgeText] = useState("");

  interface ProductSent {
    name: string;
    price: number;
    quantity: number;
  }

  function handleInputChange() {
    setBadgeText("")
  }

  async function confirm() {
    const productName = inputName.current?.value || "";
    const productPrice = inputPrice.current?.value || "";
    const productQuantity = inputQuantity.current?.value || "";

    if (!productName || !productPrice || !productQuantity) {
      setBadgeText("Veuillez remplir tous les champs du produit");
      setShowToast(true);
      return;
    }
    const formattedProduct: ProductSent = {
      name: String(productName),
      price: Number(productPrice),
      quantity: Number(productQuantity),
    };
    console.log("formattedProduct", formattedProduct);

    try {
      await AddProduct(formattedProduct);
      modal.current?.dismiss();
      setToastMessage("produit ajouter");
      setShowToast(true);
      setRefresh((RefreshState) => !RefreshState);
    } catch (error) {
      setToastMessage("problem a ete servenu");
      setShowToast(true);
    }
  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      const productName = inputName.current?.value || "";
      const productPrice = inputPrice.current?.value || "";
      const productQuantity = inputQuantity.current?.value || "";

      if (!productName || !productPrice || !productQuantity) {
        setToastMessage("Veuillez remplir tous les champs du produit");
        setShowToast(true);
        ev.preventDefault();
      }
    }
  }

  return (
    <>
      <IonButton className="addButton" id="open-modal" expand="block">
        ajouter un produit
      </IonButton>
      <IonModal
        ref={modal}
        trigger="open-modal"
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>ajouter un produit</IonTitle>
            <IonButtons slot="end">
              <IonButton type="submit" strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Nom de produit</IonLabel>
            <IonInput
              required
              onIonFocus={handleInputChange}
              ref={inputName}
              type="text"
              placeholder="entrez le nom de produit"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">prix</IonLabel>
            <IonInput
              required
              ref={inputPrice}
              type="number"
              placeholder="entrez le prix de produit"
              onIonFocus={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Quantité</IonLabel>
            <IonInput
              required
              ref={inputQuantity}
              type="number"
              placeholder=" entrez la quantité de produit"
              onIonFocus={handleInputChange}
            />
          </IonItem>
        </IonContent>
        {BadgeText?<IonBadge color={"warning"}>{BadgeText}</IonBadge>:null}
      </IonModal>

      <IonToast
        className="custom-toast"
        color={"success"}
        icon={checkmarkDone}
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
      ></IonToast>
    </>
  );
}

export default Modal;
