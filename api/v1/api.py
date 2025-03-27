from fastapi import APIRouter

from .endpoints import user, customization, favorite, chipset, model, device, benchmark, library

router = APIRouter()

router.include_router(user.router, prefix = "/user", tags = ["user"])
router.include_router(customization.router, prefix = "/customization", tags = ["customization"])
router.include_router(favorite.router, prefix = "/favorite", tags = ["favorite"])
router.include_router(chipset.router, prefix = "/chipset", tags = ["chipset"])
router.include_router(device.router, prefix = "/device", tags = ["device"])
router.include_router(model.router, prefix = "/model", tags = ["model"])
router.include_router(benchmark.router, prefix = "/benchmark", tags = ["benchmark"])
router.include_router(library.router, prefix = "/library", tags = ["library"])