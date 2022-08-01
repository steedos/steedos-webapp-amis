/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-04 11:24:28
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-08-01 15:18:38
 * @Description:
 */
import dynamic from "next/dynamic";
import Document, { Script, Head, Main, NextScript } from "next/document";
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { getViewSchema, getFormSchema, getObjectRelateds } from "@/lib/objects";
import { AmisRender } from "@/components/AmisRender";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Tab, Menu, Transition } from "@headlessui/react";
import {
  getObjectDetailButtons,
  getObjectDetailMoreButtons,
} from "@/lib/buttons";
import { Button } from "@/components/object/Button";
import { RelatedList } from '@/components/object/RelatedList'

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function newRecord({}) {
  const router = useRouter();
  const { app_id, tab_id, record_id = 'new' } = router.query;
  const [schema, setSchema] = useState(null);
  const [formFactor, setFormFactor] = useState(null);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setFormFactor("SMALL");
    } else {
      setFormFactor("LARGE");
    }
  }, []);

  useEffect(() => {
    editRecord(tab_id, record_id, formFactor);
  }, [formFactor]);

  const editRecord = (tab_id, record_id, formFactor) => {
    if (tab_id && record_id) {
      getFormSchema(tab_id, {
        recordId: record_id,
        tabId: tab_id,
        appId: app_id,
        formFactor: formFactor,
      }).then((data) => {
        setSchema(data);
      });
    }
  };

  const cancelClick = () => {
    router.back();
  };

  const submitClick = (e) => {
    const scope = SteedosUI.getRef(`${app_id}-${tab_id}-${record_id}`);
    const form = scope.getComponentByName(
      `page_edit_${record_id}.form_edit_${record_id}`
    );
    form.handleAction({}, { type: "submit" });
  };

  return (
    <>
      <div className="z-9 relative ">
        <div className="space-y-4">
          <div className="pointer-events-auto w-full text-[0.8125rem] leading-5">
            <div className="">
              <div className="flex justify-between">
                <div className="inline-block text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-3xl">
                  创建 {schema?.uiSchema?.label}
                </div>
                <div className="ml-6 flex flex-nowrap space-x-2 fill-slate-400">
                    <button
                        onClick={cancelClick}
                        className="antd-Button border-1 border-solid border-slate-300 py-0.5 px-3 text-slate-400 hover:bg-slate-300 hover:text-white  focus:outline-none sm:rounded-[2px]"
                      >
                        取消
                      </button>
                      <button
                        onClick={submitClick}
                        className="antd-Button bg-sky-500 py-0.5 px-3 font-semibold text-white hover:bg-sky-600 focus:outline-none sm:rounded-[2px]"
                      >
                        提交
                      </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="z-9 relative mt-2 ">
        <Tab.Group vertical={true}>
          <Tab.List className="flex space-x-1 p-2">
            <Tab
              key="detail"
              className={({ selected }) =>
                classNames(
                  "w-full max-w-[15rem] pb-2",
                  "",
                  selected ? "border-b-2 border-sky-500" : ""
                )
              }
            >
              基本信息
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-0">
            <Tab.Panel
              key="detail"
              className={classNames("bg-white sm:rounded-b-xl", "")}
            >
              {schema?.amisSchema && (
                <AmisRender
                  id={`${app_id}-${tab_id}-${record_id}`}
                  schema={schema?.amisSchema || {}}
                  router={router}
                ></AmisRender>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/login?callbackUrl=/app",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
