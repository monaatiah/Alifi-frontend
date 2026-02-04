import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/styles.module.scss";
import { useForm } from "react-hook-form";
import { resendVerificationEmail, verifyEmail } from "@/store/actions";
import { useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import OtpInput from "react-otp-input";

const Index = () => {
  const dispatch = useDispatch();
  const { reset, handleSubmit, setValue } = useForm();

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);

  const handleChange = (otp) => {
    setOtp(otp);
    setValue("otp", otp);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const resetInputs = () => {
    setOtp("");
    setValue("otp", "");
  };

  const formSubmit = (data) => {
    dispatch(
      verifyEmail({
        type: "verify-email",
        data: data,
        reset,
        resetInputs,
      }),
    );
  };

  return (
    <div className={styles["login-section"]}>
      <Container>
        <Row className="justify-content-center">
          <Col lg={6} xs={12}>
            <div className="form-box">
              <h3>
                <FormattedMessage id="verifyYourEmail" />
              </h3>
              <form onSubmit={handleSubmit(formSubmit)}>
                <div className="form-group">
                  <OtpInput
                    value={otp}
                    onChange={handleChange}
                    numInputs={6}
                    containerStyle="otp-inputs"
                    inputStyle="form-control"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                <div className="form-group">
                  <p className="resendOtp">
                    <FormattedMessage id="didntReceiveCode" />
                    {timer > 0 ? (
                      <span>
                        {timer} <FormattedMessage id="seconds" />
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={timer > 0 ? true : false}
                        onClick={() => {
                          setTimer(10);
                          setOtp("");
                          dispatch(
                            resendVerificationEmail({
                              type: "resend-o-t-p",
                            }),
                          );
                        }}
                      >
                        <FormattedMessage id="resendCode" />
                      </button>
                    )}
                  </p>
                  <button
                    type="submit"
                    className="btn"
                    disabled={otp.length < 6 ? true : false}
                  >
                    <FormattedMessage id="send" />
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Index;
