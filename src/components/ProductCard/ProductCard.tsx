// ProductCard.tsx

import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React, { useState } from "react";
import "./ProductCard.css";
import { DeleteProduct } from "../../api/products";
import { Product } from "../../types";
import UpdateModal from "../Modal/UpdateModal";
import "./ProductCard.css";

interface ProductCardProps {
  product: Product;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard: React.FC<ProductCardProps> = (props) => {
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = async () => {
    try {
      await DeleteProduct(props.product.product_id);
      props.setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete the product", error);
    }
  };

  const productToEdit = {
    product_id: props.product.product_id,
    name: props.product.name,
    price: Number(props.product.price),
    quantity: Number(props.product.quantity),
  };

  return (
    <>
      <IonItem className="product-card">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{props.product.name}</IonCardTitle>
            <IonCardSubtitle></IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            {props.product.price} € {props.product.quantity}
          </IonCardContent>
          <IonButton fill="solid" onClick={() => setShowUpdateModal(true)}>
            update
          </IonButton>
          <UpdateModal
            setShowUpdateModal={setShowUpdateModal}
            setRefresh={props.setRefresh}
            productToEdit={productToEdit}
            showUpdateModal={showUpdateModal}
          ></UpdateModal>
          <IonButton
            fill="clear"
            id="delete-alert"
            onClick={() => setShowDeleteAlert(true)}
          >
            delete
          </IonButton>
        </IonCard>
      </IonItem>
      <>
        <IonAlert
          isOpen={showDeleteAlert}
          header={`delete ${props.product.name}`}
          buttons={[
            { text: "annuler" },
            { text: "supprimer", handler: handleDelete },
          ]}
          message={"Voulez-vous vraiment supprimer ce produit ?"}
          onDidDismiss={() => setShowDeleteAlert(false)}
        ></IonAlert>
      </>
    </>
  );
};

export default ProductCard;
