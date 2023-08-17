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
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { UpdateProduct } from "../../api/products";
import "./Modal.css";
import { checkmarkDone } from "ionicons/icons";

interface ProductSent {
  product_id: Number;
  name: string;
  price: number;
  quantity: number;
}
interface ModalProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  showUpdateModal: boolean;
  productToEdit: ProductSent;
}
const UpdateModal: React.FC<ModalProps> = (props) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const inputName = useRef<HTMLIonInputElement>(null);
  const inputPrice = useRef<HTMLIonInputElement>(null);
  const inputQuantity = useRef<HTMLIonInputElement>(null);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  async function confirm() {
    const product = {
      name: inputName.current?.value || props.productToEdit.name,
      price: inputPrice.current?.value || props.productToEdit.price,
      quantity: inputQuantity.current?.value || props.productToEdit.quantity,
    };
    const formattedProduct: ProductSent = {
      product_id: Number(props.productToEdit.product_id),
      name: String(product.name),
      price: Number(product.price),
      quantity: Number(product.quantity),
    };
    console.log("formattedProduct", formattedProduct);
    try {
      await UpdateProduct(formattedProduct);
      modal.current?.dismiss();
      setToastMessage("produit modifier");
      setShowToast(true);
      setInterval(()=>{
          setShowToast(false);
      },2000)
      props.setRefresh((RefreshState) => !RefreshState);
    } catch (error) {
      setToastMessage("problem a ete servenu");
      setShowToast(true);
    }
  }
  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    props.setShowUpdateModal(false);
  }
  console.log(props.showUpdateModal);

  return (
    <>
      <IonModal
        isOpen={props.showUpdateModal}
        ref={modal}
        onWillDismiss={(ev) => onWillDismiss(ev)}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle>modifier produit</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => confirm()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem aria-label="">
            <IonLabel position="fixed">Nom de produit</IonLabel>
            <IonInput
              ref={inputName}
              type="text"
              placeholder={props.productToEdit.name}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">prix</IonLabel>
            <IonInput
              ref={inputPrice}
              type="number"
              placeholder={props.productToEdit.price.toString()}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="fixed">Quantité</IonLabel>
            <IonInput
              ref={inputQuantity}
              type="number"
              placeholder={props.productToEdit.quantity.toString()}
            />
          </IonItem>
        </IonContent>
      </IonModal>
      <IonToast
        className="custom-toast"
        color={"success"}
        icon={checkmarkDone}
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
      ></IonToast>
    </>
  );
};

export default UpdateModal;
