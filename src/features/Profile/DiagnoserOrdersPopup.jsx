import React, { useMemo } from 'react';
import styles from './DiagnoserOrdersPopup.module.css';
import { useNavigate } from 'react-router-dom';

const DiagnoserOrdersPopup = ({
    booking,
    references,
    workshops,
    customer,
    handleCancel
}) => {

    const navigate = useNavigate();

    // const statuss = useSelector(state => state.Status.statuss);
    // const status = useSelector(state => state.Status.status);

    // useEffect(() => {
    //     const load = async () => {
    //         try {
    //             if (status === "faild" || status === "")
    //                 await dispatch(fetchStatus()).unwrap();
    //         }
    //         catch (err) {
    //             console.error("InitCustomer ERROR:", err);
    //         }
    //     }
    //     load()
    // }, [status, dispatch]);


    // lookup מהיר של סדנאות
    const workshopMap = useMemo(() => {
        const map = new Map();

        workshops.forEach(w => {
            map.set(Number(w.code), w);
        });

        return map;
    }, [workshops]);

    // הזמנות של המאבחנת בלבד
    // ורק סטטוסים שונים מ-1
    const orders = useMemo(() => {

        if (!booking) return [];

        const diagnoserWorkshopCodes = workshops
            .filter(w => Number(w.codeDiagnoser) === Number(booking.code))
            .map(w => Number(w.code));

        return references.filter(r =>
            diagnoserWorkshopCodes.includes(Number(r.codeWorkshop)) &&
            Number(r.status) !== 1
        );

    }, [booking, workshops, references]);

    const getPrice = (codeWorkshop) => {
        return workshopMap.get(Number(codeWorkshop))?.price || 0;
    };

    // const getStatusText = (status) => {

    //     switch (status) {

    //         case 2:
    //             return "שולם";

    //         case 3:
    //             return "לא שולם";

    //         default:
    //             return "לא ידוע";
    //     }
    // };

    // const getRowClass = (status) => {

    //     switch (status) {

    //         case 2:
    //             return styles.paidRow;

    //         case 3:
    //             return styles.unpaidRow;

    //         default:
    //             return "";
    //     }
    // };

    // if (status !== "succesfull")

        return (
            <div className={styles.popupOverlay}>

                <div className={styles.popupContent}>

                    <div className={styles.header}>

                        <h2>תורים של {booking?.name}</h2>

                        <button
                            className={styles.closeButton}
                            onClick={handleCancel}
                        >
                            X
                        </button>

                    </div>

                    <table className={styles.table}>

                        <thead>
                            <tr>
                                <th>תאריך</th>
                                <th>לקוח</th>
                                <th>מחיר סדנה</th>
                                <th>סך אחוזים</th>
                                <th>סטטוס</th>
                                <th>סדנה</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.length > 0 ? (

                                orders.map((order, idx) => (order.status != 1 &&
                                    <tr
                                        key={idx}
                                        className={order.status == 2 ? styles.paidRow : styles.unpaidRow}
                                    >

                                        <td>{order.date}</td>

                                        <td>
                                            {customer(order.codeCustomer)?.name || 'לא נמצא'}
                                        </td>

                                        <td>
                                            {getPrice(order.codeWorkshop).toLocaleString()} ₪
                                        </td>
                                         <td>
                                            {getPrice(order.codeWorkshop).toLocaleString()*0.1} ₪
                                        </td>

                                        <td>
                                            {order.status == 2 ? "שולם" : "לא שולם"}
                                        </td>

                                        <td>
                                            <button
                                                className={styles.workshopLinkBtn}
                                                onClick={() => navigate(`/WorkshopDetails/${order.codeWorkshop}`)}
                                            >
                                                {order.codeWorkshop}
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="5">
                                        אין תורים להצגה
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        );
};

export default DiagnoserOrdersPopup;