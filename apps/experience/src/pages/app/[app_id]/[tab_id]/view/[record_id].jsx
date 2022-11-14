/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-04 11:24:28
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-11-14 15:30:53
 * @Description:
 */
import React, { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { DefaultRecordDetail } from '@/components/object/DefaultRecordDetail'
import { AmisRender } from "@/components/AmisRender";
import { getPage } from "@steedos-widgets/amis-lib";
import { Loading } from '@/components/Loading';

export default function Record({formFactor}) {
  const router = useRouter();

  const { app_id, tab_id, listview_id, record_id: recordId } = router.query;
  const [page, setPage] = useState(false);

  useEffect(() => {
    getPage({type: 'record', appId: app_id, objectName: tab_id, formFactor}).then((data) => {
      setPage(data);
    });
  }, [app_id, tab_id]);

  const renderId = SteedosUI.getRefId({
    type: "detail",
    appId: app_id,
    name: tab_id,
  });


  if(page === false){
    return <Loading></Loading>
  }

  return (
    <>
      {page && (
        <AmisRender
            data={{
              objectName: tab_id,
              recordId: recordId,
              appId: app_id,
              formFactor: formFactor,
            }}
            className="steedos-listview"
            id={`${renderId}-page`}
            schema={JSON.parse(page.schema)}
            router={router}
          ></AmisRender>
      )}
      {!page && <DefaultRecordDetail formFactor={formFactor} router={router}></DefaultRecordDetail>}
    </>
  )
}

export async function getServerSideProps(context) {
  const session = context.req.session || await unstable_getServerSession(
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
