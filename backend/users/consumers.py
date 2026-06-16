from channels.generic.websocket import AsyncJsonWebsocketConsumer


class DashboardConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("dashboard_updates", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code): # type: ignore
        await self.channel_layer.group_discard("dashboard_updates", self.channel_name)

    async def dashboard_update(self, event):
        await self.send_json(event["data"])
