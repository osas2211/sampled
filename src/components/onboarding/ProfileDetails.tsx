"use client";
import { useOnboarding } from "../../hooks/useOnboarding";
import { Button, DatePicker, Form, Input, Radio } from "antd";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);

type formT = {
  username: string;
  address: string;
  dob: string;
  gender: string;
  email: string;
  avatar: string;
  preference: string[];
};

export const ProfileDetails = () => {
  const {
    onUpdateState,
    data: { fields },
  } = useOnboarding();
  const navigate = useNavigate();
  const navigate_back = () => {
    void navigate("");
  };
  return (
    <div className="md:max-w-[382px] mx-auto">
      <Form
        layout="vertical"
        initialValues={{ ...fields, dob: fields.dob ? dayjs(fields.dob) : "" }}
        requiredMark={false}
        onFinish={(values: formT) => {
          onUpdateState({
            fields: {
              ...values,
              dob: dayjs(values.dob).toISOString(),
            },
            step: 2,
          });
        }}
      >
        <Form.Item
          label="Username"
          name={"username"}
          rules={[{ required: true, min: 5 }]}
          validateDebounce={1000}
        >
          <Input className="h-[48px]" placeholder="Enter username" />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[{ required: true, type: "email" }]}
          validateDebounce={1000}
        >
          <Input className="h-[48px]" placeholder="Enter email" type="email" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={
            <div>
              <p>Date of birth</p>
              <p className="text-xs text-grey-300">
                For personalized experience
              </p>
            </div>
          }
          validateDebounce={1000}
          name={"dob"}
        >
          <DatePicker className="h-[48px] w-full" placeholder="Enter DOB" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          label={
            <div>
              <p>Gender</p>
              <p className="text-xs text-grey-300 md:max-w-[350px]">
                We use your gender to personalize content, recommendations and
                adds for you.
              </p>
            </div>
          }
          name={"gender"}
          validateDebounce={1000}
        >
          <Radio.Group className="justify-between !flex">
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
            <Radio value="not-specified">Prefer not say</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="mt-8 md:mt-8">
          <div className="flex justify-center gap-5 items-center">
            <Button
              type="default"
              className="!rounded-full md:!px-8 md:!w-[150px] !h-[40px] !w-[140px]"
              icon={<BsArrowLeft />}
              htmlType="button"
              onClick={navigate_back}
            >
              Prev
            </Button>{" "}
            <Button
              type="primary"
              className="!rounded-full md:!px-8 md:!w-[150px] !w-[140px] !h-[40px]"
              icon={<BsArrowRight />}
              iconPosition="end"
              htmlType="submit"
            >
              Next
            </Button>
          </div>

          <p className="text-xs text-grey-300 text-center mt-5">
            Privacy and Policy
          </p>
        </div>
      </Form>
    </div>
  );
};
