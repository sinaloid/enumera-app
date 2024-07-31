import { IonCol, IonInput } from "@ionic/react";
import IdSvg from "../svg/IdSvg";

interface ContainerProps {
  type: any;
  label: any;
  placeholder: any;
  children: any;
  formik: any;
  name: any;
}
const Input: React.FC<ContainerProps> = ({
  type,
  label,
  placeholder,
  children,
  formik,
  name,
}) => {
  if (type === "email") {
    return (
      <>
        <IonCol size="12">
          <div className="my-2">{label}</div>
          <IonInput
            className="custom-input"
            type="email"
            placeholder={placeholder}
            fill="outline"
            name={name}
            onIonInput={formik.handleChange}
            onIonBlur={formik.handleBlur}
            value={formik.values[name]}
          >
            {children}
          </IonInput>
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }

  if (type === "password") {
    return (
      <>
        <IonCol size="12">
          <div className="my-2">{label}</div>
          <IonInput
            className="custom-input"
            type="password"
            placeholder={placeholder}
            fill="outline"
            name={name}
            onIonInput={formik.handleChange}
            onIonBlur={formik.handleBlur}
            value={formik.values[name]}
          >
            {children}
          </IonInput>
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-danger">{formik.errors[name]}</div>
          ) : null}
        </IonCol>
      </>
    );
  }
};

export default Input;
