import { toast } from 'react-toastify';
import { BlogOfServiceDTO, Pagination, ServiceDTO, getBlogOfService, getServiceList } from '../api';
import { useEffect, useState } from 'react';

type Props = {
    request: Pagination;
    selectedPostId?: number;
    selectedPostName?: string;
    errorBlogHtml?: string;
};

type Return = {
    services: ServiceDTO[];
    blog: BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent'> | null;
    selectedId: number;
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
    setBlog: React.Dispatch<React.SetStateAction<BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent' | null>>>;
};

const useService: (props: Props) => Return = (props) => {
    const [services, setServices] = useState<Array<ServiceDTO>>([]);
    const [blog, setBlog] = useState<BlogOfServiceDTO | Pick<BlogOfServiceDTO, 'blogContent'> | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(props.selectedPostId);
    const errorBlog = props?.errorBlogHtml || '<h2>This Blog is not existing</h2>';

    useEffect(() => {
        getServiceList(props.request)
            .then((response) => {
                setServices(response || []);
            })
            .catch((error) => {
                toast.error(typeof error === 'string' ? error : 'Server Error', {
                    autoClose: 3000,
                });
            });
    }, []);

    useEffect(() => {
        if (selectedId) {
            getBlogOfService(selectedId)
                .then((response) => {
                    setBlog(response);
                })
                .catch((error) => {
                    setBlog(null);
                    toast.error(typeof error === 'string' ? error : 'Server Error', {
                        autoClose: 3000,
                    });
                });
        }
    }, [services, selectedId]);

    useEffect(() => {
        if (!!services?.length) {
            let newSelectedId = services?.find?.((s) => s.serviceName === props.selectedPostName)?.serviceId;

            setSelectedId(newSelectedId);
        }
    }, [services, props.selectedPostName]);

    return {
        services,
        blog,
        selectedId,
        setSelectedId,
        setBlog,
    };
};

export default useService;
